
function addQueryParam(url, param) {
  const { origin, search, hash } = new URL(url);

  const searchParams = search.replace(/\?/, '').split('&').reduce((params, temp) => {
    const [key, value] = temp.split('=');
    try {
      params[key] = decodeURIComponent(value);
    } catch(e) {
      params[key] = '';
    }
    return params;
  }, {});
  
  const resultParams = {
    ...searchParams,
    ...param,
  };
  const searchStringArr = Object.keys(resultParams).reduce(
    (tempSearchString, key) => {
      tempSearchString.push(`${key}=${encodeURIComponent(resultParams[key])}`);
      return tempSearchString;
    },
    []
  );
  const searchString = searchStringArr.join('&');
  
  return `${origin}${searchString ? '?' : ''}${searchString}${hash}`;
}

var locations = [
  { id: 5, pid: 3, name: '天河' },
  { id: 3, pid: 1, name: '广州' },
  { id: 0 },
  { id: 1, pid: 0, name: '广东' },
  { id: 2, pid: 1, name: '深圳' },
  { id: 4, pid: 2, name: '南山' },
];


function buildLocalmaps(locationList) {
  const maps = {};
  let root;

  locationList.forEach(item => {
    const { id, pid } = item;

    let currentNode = maps[id];

    if (currentNode) {
      currentNode = maps[id] = {
        ...currentNode,
        ...item,
      };
    } else {
      currentNode = maps[id] = {
        ...item,
      };
    }

    if (pid === undefined) {
      root = currentNode;
      return;
    }

    let parenetNode = maps[pid];

    if (parenetNode) {
      if (!parenetNode.subLocations) {
        parenetNode.subLocations = [];
      }
      parenetNode.subLocations.push(currentNode);
    } else {
      parenetNode = {
        subLocations: [currentNode],
      };
      maps[pid] = parenetNode;
    }
  });

  return root;
}

buildLocalmaps(locations);

const isObject = data => data && Object.prototype.toString(data) === '[object Object]'
const c2p = key => {
  const [first, ...rest] = key.split('');
  return first.toUpperCase() + rest.join('');
}
const p2c = key => {
  const [first, ...rest] = key.split('');
  return first.toLowerCase() + rest.join('');
}

function walkData(data, convertFn) {
  if (Array.isArray(data)) {
    return data.map(item => {
      return walkData(item, convertFn);
    });
  } else if (isObject(data)) {
    return Object.keys(data).reduce((result, key) => {
      const newKey = convertFn(key);
      result[newKey] = walkData(data[key], convertFn);
      return result;
    }, {});
  } else {
    return data;
  }
}

const camelToPascal = data => walkData(data, c2p);
const pascalToCamel = data => walkData(data, p2c);

function camelToPascal(data) {
  if (Array.isArray(data)) {
    return data.map(item => {
      return camelToPascal(item);
    });
  } else if (isObject(data)) {
    return Object.keys(data).reduce((result, key) => {
      const newKey = c2p(key);
      result[newKey] = camelToPascal(data[key]);
      return result;
    }, {});
  } else {
    return data;
  }
}

function pascalToCamel(data) {
  if (Array.isArray(data)) {
    return data.map(item => {
      return pascalToCamel(item);
    });
  } else if (isObject(data)) {
    return Object.keys(data).reduce((result, key) => {
      const newKey = p2c(key);
      result[newKey] = pascalToCamel(data[key]);
      return result;
    }, {});
  } else {
    return data;
  }
}

