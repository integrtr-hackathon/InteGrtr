export const extractData = (rawText) => {
  try {
    const match = rawText.match(
      /dwr\.engine\._remoteHandleCallback\('4','0',([\s\S]*)\);/
    );

    if (!match) return null;

    const jsonString = match[1];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Parse error:", error);
    return null;
  }
};

export const extractRoleData = (rawText) => {
  try {
    // Try to parse as JSON directly
    const data = JSON.parse(rawText);
    if (data.roles) {
      return data;
    }

    // Try to extract from DWR callback format
    const match = rawText.match(
      /dwr\.engine\._remoteHandleCallback\('[\d]+','[\d]+',([\s\S]*)\);/
    );

    if (match) {
      const jsonString = match[1];
      return JSON.parse(jsonString);
    }

    return null;
  } catch (error) {
    console.error("Parse error:", error);
    return null;
  }
};
