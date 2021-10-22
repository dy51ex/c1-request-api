import { components } from "../../types/v2";
import c1request from "../base/c1request";
import LogAction from "../base/LogAction";
import objectTypesGet from "../objectTypes/get";
import objectPatch from "./patch";

export class Case {
  public type!: components["schemas"]["CaseMap.PublicApi.CaseTypes.CaseTypeDetails"];
  constructor(
    private value: components["schemas"]["CaseMap.PublicApi.Cases.V2.CaseWithTaggedFields"]
  ) {}

  async loadType() {
    this.type = await objectTypesGet(this.value.CaseType.Id);
  }

  async patch(data: Record<string, any>) {
    this.value = await objectPatch(this.value.Id, data);
    return this.value;
  }

  getFieldValue(fieldId: string) {
    const fields = this.value.Fields;
    if (!fields) {
      throw new Error(`Case ${this.value.Id} - no field with id or tag ${fieldId}`);
    }
    return fields[fieldId];
  }

  getFieldInfo(fieldId: string) {
    const field = this.getFieldsMap()[fieldId];
    if (!field) {
      throw new Error(`Case ${this.value.Id} - no field with id or tag ${fieldId}`);
    }
    return field;
  }

  getFieldsMap() {
    const fields: Record<
      string,
      components['schemas']['CaseMap.PublicApi.Blocks.FieldMetadata'] & {
        blockId: string | null | undefined,
        lineId: string | null | undefined,
        Id?: string | null | undefined;
        Name: string;
        Tag?: string | null | undefined;
        ExternalId?: string | null | undefined;
      }
    > = {};
    this.type.Blocks.forEach((block) => block.Lines.forEach((line) =>
        line.Fields.forEach((field) => {
          if (field.Id) {
            fields[field.Id] = {
              ...field,
              lineId: line.Id,
              blockId: block.Id,
            };
          }
          if (field.Tag) {
            fields[field.Tag] = {
              ...field,
              lineId: line.Id,
              blockId: block.Id,
            };
          }
        }))
    );
    return fields;
  }
}


async function get(objectId: string) {
  const logic = () => {
    return c1request<
      components["schemas"]["CaseMap.PublicApi.Cases.V2.CaseWithTaggedFields"]
    >({
      type: "get",
      url: `/api/v2/objects/${objectId}`,
    });
  };

  return new Case(await LogAction("$.objects.get", logic));
}

export default get;
