import Joi, { type Schema, type ObjectSchema } from 'joi';

import type { Screens, TailwindBootstrapGridOptions } from '../types';

const validate =
  ({ screens }: { screens: Screens }) =>
  (input: TailwindBootstrapGridOptions) => {
    const makeScreenSubUnit = (schema: Schema) =>
      Object.keys(screens).reduce<Record<string, Schema>>((obj, screen) => {
        obj[screen] = schema;
        return obj;
      }, {});

    const schema: ObjectSchema<TailwindBootstrapGridOptions> = Joi.object({
      gridColumns: Joi.number().integer().min(3).required(),
      gridGutterWidth: Joi.string().required(),
      gridGutters: Joi.object().required(),
      generateContainer: Joi.boolean(),
      containerMaxWidths: Joi.object(
        makeScreenSubUnit(Joi.string()),
      ).required(),
      rtl: Joi.boolean(),
      respectImportant: Joi.boolean(),
    }).required();

    const { error } = schema.validate(input);

    if (error) {
      throw new Error(
        `tailwind-bootstrap-grid options: \n${JSON.stringify(
          input,
          null,
          2,
        )}\nare invalid: ${error} `,
      );
    }

    return input;
  };

export default validate;
