export interface SchemaValidator {
    validate: (xml: string) => Promise<string>;
}
declare type GetValidatorModuleSpec = () => Promise<SchemaValidator>;
declare const getValidatorModule: GetValidatorModuleSpec;
export { getValidatorModule };
