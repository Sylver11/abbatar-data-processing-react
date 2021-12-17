export type Result<T> = { ok: boolean, message: string }
  
export interface DataArrayOfObjects {
  active: number;
  asn: number;
  countrycode: string;
  id: number;
  statecode: string | null;
  meta: string 
}

export function validateDataJson(obj: any): Result<DataArrayOfObjects> {
  if (typeof obj.active !== "number") {
    return {
        ok: false,
        message: `obj.active must be of type number but was ${typeof obj.active}`
    }
  }
  if (typeof obj.asn !== "number") {
    return {
        ok: false,
        message: `obj.asn must be of type number but was ${typeof obj.asn}`
    }
  }
  if (typeof obj.countrycode !== "string") {
      return {
          ok: false,
          message: `obj.countrycode must be of type string but was ${typeof obj.countrycode}`
      }
  } else if (obj.countrycode.length === 0) {
      return { 
          ok: false,
          message: `obj.countrycode cannot be empty`
      }
  }
  if (typeof obj.id !== "number") {
    return {
        ok: false,
        message: `obj.id must be of type number but was ${typeof obj.id}`
    }
  }
  if (obj.statecode && typeof obj.statecode !== "string" && obj.statecode !== 'null') {
    
    return {
        ok: false,
        message: `obj.statecode must be of type string or null but was ${typeof obj.statecode}`
    }
  } else if (typeof obj.statecode == "string"  && obj.statecode.length === 0) {
      return { 
          ok: false,
          message: `obj.statecode cannot be empty`
      }
  }
  if (typeof obj.meta !== "string") {
    return {
        ok: false,
        message: `obj.meta must be of type string but was ${typeof obj.meta}`
    }
  } else if (obj.meta.length === 0) {
      return { 
          ok: false,
          message: `obj.meta cannot be empty`
      }
  }
  return {
      ok: true,
      message: ""
  }
}

function isLatitude(lat: number) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lng: number) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}

interface GeoArryOfObjects {
  ipv4: string; // valid_ip_address
  geo: string; // valid lat long
}

var regexIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

export function validateGeoJson(obj: any): Result<GeoArryOfObjects> {
  var ipv4 = obj.ipv4.match(regexIp);
  if (ipv4 && typeof obj.ipv4 !== "string") {
      return {
          ok: false,
          message: `obj.ipv4 must be of type string but was ${typeof obj.ipv4}`
      }
  } else if (obj.ipv4.length === 0) {
      return { 
          ok: false,
          message: `obj.countrycode cannot be empty`
      }
  }
  var location = obj.geo.split(",");
  var lat = parseFloat(location[0]);
  var lon = parseFloat(location[1])
  if (isLatitude(lat) && isLongitude(lon) && typeof obj.geo !== "string") {
    return {
        ok: false,
        message: `obj.meta must be of type string but was ${typeof obj.geo}`
    }
  } else if (obj.geo.length === 0) {
      return { 
          ok: false,
          message: `obj.meta cannot be empty`
      }
  }
  return {
      ok: true,
      message: ""
  }
}