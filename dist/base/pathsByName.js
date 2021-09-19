"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogAction_1 = __importDefault(require("./LogAction"));
exports.default = (obj, params) => __awaiter(void 0, void 0, void 0, function* () {
    const logic = () => {
        const keys = ['MetadataOfBlocks', 'MetadataBlocks'];
        const key = keys.find((entry) => obj[entry]);
        if (!key)
            throw new Error('obj - no MetadataOfBlocks found in project');
        const result = [];
        // eslint-disable-next-line
        obj[key].forEach((block) => {
            var _a;
            return (_a = block.Lines) === null || _a === void 0 ? void 0 : _a.forEach(
            // eslint-disable-next-line
            (line) => {
                var _a;
                return (_a = line.Fields) === null || _a === void 0 ? void 0 : _a.forEach((field) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const name = typeof field.ProjectField === 'object' ? field.ProjectField.Name : '';
                    if (!field.ProjectField
                        || !name
                        || !line.LineType
                        || !block.Id
                        || !line.Id
                        || !field.Id) {
                        throw new Error('obj - no ProjectField in field found or LineType undefined');
                    }
                    if (params.fieldNames.includes(name || 'undefined')
                        && (params.blockName ? block.NameInProject === params.blockName : true)) {
                        result[params.fieldNames.indexOf(name)] = {
                            blockId: block.Id,
                            lineId: line.Id,
                            fieldId: field.Id,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            blockName: block.NameInProject,
                            multiBlock: block.IsRepeatable,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            multiLine: line.LineType.SysName === 'Repeated',
                            name: name,
                        };
                    }
                });
            });
        });
        return result;
    };
    return (0, LogAction_1.default)('$.pathsByName', logic);
});
//# sourceMappingURL=pathsByName.js.map