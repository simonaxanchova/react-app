import * as yup from "yup";
import { number } from "yup/lib/locale";

export const CreateUserValidator = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Името мора да содржи најмалку 2 букви")
    .test(
      "is-first-upper",
      "Првата буква на името мора да биде голема буква",
      (value) => {
        if (value[0] >= "A" && value[0] <= "Z") {
          return true;
        }
        return false;
      }
    )
    .required("Име е задолжително поле"),

  lastName: yup
    .string()
    .required("Презиме е задолжително поле")
    .min(2, "Презимето мора да содржи најмалку 2 букви")
    .test(
      "is-first-upper",
      "Првата буква на презимето мора да биде голема буква",
      (value) => {
        if (value[0] >= "A" && value[0] <= "Z") {
          return true;
        }
        return false;
      }
    )
    .required("Презиме е задолжилтено поле"),

  email: yup
    .string()
    .email("Погрешен формат за меил")
    .required("Меил е задолжително поле"),
  phone: yup
    .string()
    .test("is-number", "Можен е внес само на броеви", (value) => {
      if (isNaN(value)) {
        return false;
      }
      return true;
    })
    .required("Број е задолжително поле"),
});

export const UpdateUserValidator = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Името мора да содржи најмалку 2 букви")
    .test(
      "is-first-upper",
      "Првата буква на името мора да биде голема буква",
      (value) => {
        if (value[0] >= "A" && value[0] <= "Z") {
          return true;
        }
        return false;
      }
    )
    .required("Име е задолжително поле"),

  lastName: yup
    .string()
    .required("Презиме е задолжително поле")
    .min(2, "Презимето мора да содржи најмалку 2 букви")
    .test(
      "is-first-upper",
      "Првата буква на презимето мора да биде голема буква",
      (value) => {
        if (value[0] >= "A" && value[0] <= "Z") {
          return true;
        }
        return false;
      }
    )
    .required("Презиме е задолжилтено поле"),

  email: yup
    .string()
    .email("Погрешен формат за меил")
    .required("Меил е задолжително поле"),
  phone: yup
    .string()
    .test("is-number", "Можен е внес само на броеви", (value) => {
      if (isNaN(value)) {
        return false;
      }
      return true;
    })
    .required("Број е задолжително поле"),
});
