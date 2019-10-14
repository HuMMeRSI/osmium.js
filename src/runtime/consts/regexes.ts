export const importFile = /(?<=from ').*?(?=';?)/g;
export const importedElements = /(?<=({|,| ))\w+(?=(}|,| }| from))/g;
export const importStatement = /import.*?'.*';?/g;
export const matchModifierName = /(?<={{ ?).+(?= ?}})/g;
export const matchFullModifierName = /({{ ?.+? ?}})/g;
export const matchRuntimeName = /(?<=\${)(.+?)(?=})/g;
export const matchFullRuntimeName = /(\${.+?})/g;
// export const matchRuntimeName = /(?<=\+)(.+?)(?=\+)/g;
// export const matchFullRuntimeName = /(\+.+?\+)/;
export const getSpecificMatchFullModifierName = (name): RegExp => new RegExp(`{{ ?${name} ?}}`, 'g');
export const matchFuncCall = /(.+?)\((.+)?\)/;
export const matchPrefixAttr = /^([@:])?(.+)/;
