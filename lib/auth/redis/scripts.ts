/**
 * Lua scripts for atomic Redis auth operations
 *
 * All scripts are EVAL'd so multi-key updates happen in one round-trip
 * with no race conditions between concurrent requests.
 */

/** Rotate refresh token: revoke old JTI + store new JTI + update user set */
export const ROTATE_REFRESH_SCRIPT = `
-- KEYS[1] = rt:jti:{oldJti}
-- KEYS[2] = rt:jti:{newJti}
-- KEYS[3] = rt:user:{email}
-- ARGV[1] = oldJti
-- ARGV[2] = newJti
-- ARGV[3] = email
-- ARGV[4] = new record JSON  {"email":"...","exp":...}
-- ARGV[5] = TTL seconds for new token
-- ARGV[6] = user-set TTL seconds

local oldKey  = KEYS[1]
local newKey  = KEYS[2]
local userKey = KEYS[3]

local oldJti  = ARGV[1]
local newJti  = ARGV[2]
local email   = ARGV[3]
local record  = ARGV[4]
local ttl     = tonumber(ARGV[5])
local userTtl = tonumber(ARGV[6])

-- Verify old token still exists and belongs to this email
local raw = redis.call('GET', oldKey)
if not raw then
  return {0, 'not_found'}
end

local ok, data = pcall(cjson.decode, raw)
if not ok or data.email ~= email then
  return {0, 'invalid'}
end

-- Delete old JTI
redis.call('DEL', oldKey)
redis.call('SREM', userKey, oldJti)

-- Store new JTI
redis.call('SET', newKey, record, 'EX', ttl)
redis.call('SADD', userKey, newJti)
redis.call('EXPIRE', userKey, userTtl)

return {1, 'ok'}
`;

/** Blacklist a JTI only if it isn't already blacklisted (idempotent) */
export const BLACKLIST_SCRIPT = `
-- KEYS[1] = bl:jti:{jti}
-- ARGV[1] = value JSON
-- ARGV[2] = TTL seconds

local key = KEYS[1]
local val = ARGV[1]
local ttl = tonumber(ARGV[2])

if redis.call('EXISTS', key) == 1 then
  return 0  -- already blacklisted
end

redis.call('SET', key, val, 'EX', ttl)
return 1
`;

/**
 * Revoke all refresh tokens for a user atomically
 * Returns number of JTIs removed
 */
export const REVOKE_ALL_SCRIPT = `
-- KEYS[1] = rt:user:{email}
-- ARGV[1] = jti key prefix  (e.g. "rt:jti:")

local userKey = KEYS[1]
local prefix  = ARGV[1]

local jtis = redis.call('SMEMBERS', userKey)
local count = 0

for i, jti in ipairs(jtis) do
  local deleted = redis.call('DEL', prefix .. jti)
  count = count + deleted
end

redis.call('DEL', userKey)
return count
`;

/**
 * Store refresh token + add to user set in one atomic write
 */
export const STORE_REFRESH_SCRIPT = `
-- KEYS[1] = rt:jti:{jti}
-- KEYS[2] = rt:user:{email}
-- ARGV[1] = record JSON
-- ARGV[2] = TTL seconds
-- ARGV[3] = jti
-- ARGV[4] = user-set TTL

local jtiKey  = KEYS[1]
local userKey = KEYS[2]
local record  = ARGV[1]
local ttl     = tonumber(ARGV[2])
local jti     = ARGV[3]
local userTtl = tonumber(ARGV[4])

redis.call('SET', jtiKey, record, 'EX', ttl)
redis.call('SADD', userKey, jti)
redis.call('EXPIRE', userKey, userTtl)

return 1
`;

/**
 * Validate refresh token + optionally check not blacklisted
 * Returns: {1, email, exp} on success, {0, reason} on failure
 */
export const VALIDATE_REFRESH_SCRIPT = `
-- KEYS[1] = rt:jti:{jti}
-- KEYS[2] = bl:jti:{jti}   (blacklist key)
-- ARGV[1] = expected email

local jtiKey = KEYS[1]
local blKey  = KEYS[2]
local email  = ARGV[1]

-- Blacklisted?
if redis.call('EXISTS', blKey) == 1 then
  return {0, 'blacklisted'}
end

local raw = redis.call('GET', jtiKey)
if not raw then
  return {0, 'not_found'}
end

local ok, data = pcall(cjson.decode, raw)
if not ok then
  return {0, 'corrupt'}
end

if data.email ~= email then
  return {0, 'email_mismatch'}
end

local now = tonumber(redis.call('TIME')[1]) * 1000
if now > data.exp then
  redis.call('DEL', jtiKey)
  return {0, 'expired'}
end

return {1, data.email, tostring(data.exp)}
`;
