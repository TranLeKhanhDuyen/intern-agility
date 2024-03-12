// import messages_vi from '../translations/vi.json';
// import messages_en from '../translations/en.json';

const flattenMessages = (
  nestedMessages: any,
  prefix = ''
): Record<string, string> => {
  if (nestedMessages == null) {
    return {};
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      return { ...messages, [prefixedKey]: value };
    } else {
      return { ...messages, ...flattenMessages(value, prefixedKey) };
    }
  }, {});
};

const messages: Record<string, Record<string, string>> = {
  // vi: flattenMessages(messages_vi),
  // en: flattenMessages(messages_en)
};

const getMessageByKey = (key: string, lang: string): string | undefined => {
  return messages[lang]?.[key];
};

const getFlattenedMessages = (): Record<string, Record<string, string>> => {
  return messages;
};

export { getMessageByKey, getFlattenedMessages };
