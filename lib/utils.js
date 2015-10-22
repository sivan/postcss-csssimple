module.exports = {
  regRGBA: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d\.]+\s*)/gi,
  regAllPseudo: /::(before|after|first-line|first-letter)/gi,
  regBlankLine: /(\r\n|\n|\r)(\s*?\1)+/gi
};
