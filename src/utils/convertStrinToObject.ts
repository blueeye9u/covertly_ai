const extractDataFromLine = (line: string) => {
  const regex = /data: (.+)/;
  const match = regex.exec(line);
  return match ? match[1] : null;
};

const extractObjectData = (dataObject: any) => {
  const result = {
    citations: dataObject?.citations || null,
    chatEvent: dataObject?.chatEvent || null,
    chat: dataObject?.chat || null,
    content: ""
  };

  if (dataObject?.content) {
    result.content = dataObject.content;
  } else if (dataObject?.error) {
    result.content = dataObject;
  }

  return result;
};

const processLine = (line: string, metadata: { citations: any; chatEvent: any; chat: any }) => {
  const jsonString = extractDataFromLine(line);
  if (!jsonString) return null;

  const dataObject = fixJsonString(jsonString);
  if (!dataObject) return null;

  const extracted = extractObjectData(dataObject);

  // Update metadata with latest values
  if (extracted.citations) metadata.citations = extracted.citations;
  if (extracted.chatEvent) metadata.chatEvent = extracted.chatEvent;
  if (extracted.chat) metadata.chat = extracted.chat;

  return extracted.content;
};

export const convertStringToObject = (inputString: string) => {
  if (!inputString) return [];

  const lines = inputString.trim().split("\n");
  const contents: any = [];
  const metadata = { citations: null, chatEvent: null, chat: null };

  try {
    for (const line of lines) {
      const content = processLine(line, metadata);
      if (content !== null) {
        contents.push(content);
      }
    }

    return contents.map((item: string, i: number) => ({
      _id: i,
      data: item,
      citations: metadata.citations,
      chatEvent: metadata.chatEvent,
      chat: metadata.chat
    }));
  } catch (err) {
    console.log("err", err);
    return [];
  }
};

export const parseStreamData = (inputString: string) => {
  if (!inputString) return [];

  const contents: { _id: number; data: string | object; model: string }[] = [];

  // Regex to match all JSON objects
  const jsonRegex = /{[^{}]*(?:{[^{}]*}[^{}]*)*}/g;
  const matches = inputString.match(jsonRegex);

  if (!matches) return [];

  for (const [index, match] of matches.entries()) {
    try {
      const parsed = JSON.parse(match);
      const data = parsed?.data ?? {};
      const model = data?.model ?? "";
      const content = data?.content ?? data?.error ?? "";
      contents.push({ _id: index, data: content, model });
    } catch (err) {
      console.error("Failed to parse JSON match:", err, match);
    }
  }

  return contents;
};

const fixJsonString = (jsonString: string) => {
  // Function to add missing quotes or brackets
  const addMissingCharacters = (str: string) => {
    let balanced = str;
    let quoteCount = (str.match(/"/g) || []).length;
    let openingBraces = (str.match(/{/g) || []).length;
    let closingBraces = (str.match(/}/g) || []).length;

    // Adding missing quotes
    if (quoteCount % 2 !== 0) {
      balanced += '"';
    }

    // Adding missing closing braces
    while (openingBraces > closingBraces) {
      balanced += "}";
      closingBraces++;
    }

    return balanced;
  };

  // Try to parse the JSON string
  try {
    return JSON.parse(jsonString);
  } catch (error_) {
    console.warn("Initial JSON parse failed:", error_);
    const correctedString = addMissingCharacters(jsonString);
    try {
      return JSON.parse(correctedString);
    } catch (error) {
      console.error("Failed to fix JSON string:", error);
      return null;
    }
  }
};
