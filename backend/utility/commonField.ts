export default function addCommonDbFields(jsonData) {
  const currentTime = new Date();
  jsonData.validFrom = currentTime;
  jsonData.validTo = currentTime;
  jsonData.recordDateTime = currentTime;
  jsonData.latestFlag = 1;
  jsonData.activeFlag = 1;
  jsonData.companyTenantId = 'R360';
  return jsonData;
}
