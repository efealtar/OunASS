const bluebird = require('bluebird');
const redis = require('redis');

const config = require('../config');

bluebird.promisifyAll(redis.RedisClient.prototype);

// create multiple clients as we can't use subscriber to publish
const [
  client,
] = [0, 1, 2].map(() => redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  db: config.redis.db,
}));

const getValueWithTimestamp = async ({ key }) => {
  const valueStr = await client.getAsync(key);

  if (!valueStr) {
    return undefined;
  }

  const value = JSON.parse(valueStr);

  return value;
};

const set = async ({
  key,
  value,
  ttl,
}) => {
  const valueWithTimestamp = {
    timestamp: Date.now(),
    value,
  };

  const valueWithTimestampStr = JSON.stringify(valueWithTimestamp);

  await client.setAsync(
    key,
    valueWithTimestampStr,
    ...(ttl ? ['PX', ttl] : []),
  );

  return value;
};

function doRequest({
  key,
  fallback,
  ttl,
}) {
  return fallback()
    .then((result) => set({
      key,
      value: result,
      ttl,
    }))
    .catch((err) => {
      throw err;
    });
}

const getOrFallback = async ({
  key,
  fallback,
  ttl,
}) => {
  const valueWithTimestamp = await getValueWithTimestamp({ key });

  if (
    !valueWithTimestamp
    || (valueWithTimestamp.timestamp + ttl) <= Date.now()
  ) {
    return doRequest({
      key,
      fallback,
      ttl,
    });
  }

  return valueWithTimestamp.value;
};

const del = (key) => client.delAsync(key);

module.exports = {
  getOrFallback,
  del,
};
