
//Auth responses:
export const emailPassIncorrectErr = res => res.status(403).send("your email or password is incorrect")

export const loggedInSuccessfuly = (res, token) = res.status(200).json({token}) //get the token with res.data.token

export const userCreatedSuccessfuly = res => res.status(200).send("user created successfuly.")

export const userDeletedSuccessfuly = res => res.status(200).send("user deleted successfuly.")

export const userUpdatedSuccessfuly = res => res.status(200).send("user updated successfuly.")

//Wizard responses:
export const wizardNotFoundErr = res => res.status(404).send("wizard not found.")

export const wizardCreatedSuccessfuly = res => res.status(200).send("wizard created successfuly.")

export const wizardDeletedSuccessfuly = res => res.status(200).send("wizard deleted successfuly.")

export const wizardUpdatedSuccessfuly = res => res.status(200).send("wizard updated successfuly.")

export const wizardSentSuccessfuly = res => res.status(200).send("wizard sent successfuly")


//Global responses:
export const emptyFieldErr = res => res.status(400).send("one of the fields is empty.")

export const internalServerErr = res => res.status(500).send("internal server error.")

export const accessDeniedErr = res => res.status(403).send("access denied.")


