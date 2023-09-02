export default function addCommonDbFields(jsonData) {
  jsonData.validFrom = new Date();
  jsonData.validTo = new Date();
  jsonData.recordDateTime = new Date();
  jsonData.latestFlag = 1;
  jsonData.activeFlag = 1;
  jsonData.companyTenantId = 'R360';
  return jsonData;
}
