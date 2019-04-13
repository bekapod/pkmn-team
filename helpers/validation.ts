import { string, array, object, number } from "yup";

export const idValidation = string()
  .required("Your team does not exist.")
  .nullable();

export const nameValidation = string().required(
  "You should give your team a name."
);

export const membersValidation = array()
  .of(
    object().shape({
      order: number().integer(
        "An error occurred while putting your team members in order."
      ),
      pokemonId: string().min(
        1,
        "One of your team members is not a valid pokemon."
      )
    })
  )
  .max(6, "Your team has too many members.");

export const updateTeamSchema = object().shape({
  id: idValidation,
  name: nameValidation,
  members: membersValidation.required(
    "Your team should have at least one member."
  )
});

export const createTeamSchema = object().shape({
  name: nameValidation,
  members: membersValidation
});
