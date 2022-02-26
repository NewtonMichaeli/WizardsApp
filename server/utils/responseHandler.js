
//Auth responses:
const emailPassIncorrectErr = res => res.status(403).send("your email or password is incorrect")

const loggedInSuccessfuly = (res, token) => res.status(200).json({token}) //get the token with res.data.token

const userCreatedSuccessfuly = (res, token) => res.status(200).send({token})

const userDeletedSuccessfuly = res => res.status(200).send("user deleted successfuly.")

const userUpdatedSuccessfuly = res => res.status(200).send("user updated successfuly.")

const userSentSuccessfuly = (res, user) => res.status(200).json({user}) //get the user with res.data.user

//Wizard responses:
const wizardNotFoundErr = res => res.status(404).send("wizard not found.")

const wizardCreatedSuccessfuly = res => res.status(200).send("wizard created successfuly.")

const wizardDeletedSuccessfuly = res => res.status(200).send("wizard deleted successfuly.")

const wizardUpdatedSuccessfuly = res => res.status(200).send("wizard updated successfuly.")

const wizardSentSuccessfuly = (res, wizard) => res.status(200).json({results: wizard})

const wizardFilledSuccessfuly = res => res.status(200).send("wizard filled successfuly")

//Global responses:

const fieldsErr = (res, err) => res.status(400).send(`fields error: ${err}`)

const internalServerErr = res => res.status(500).send("internal server error.")

const accessDeniedErr = res => res.status(403).send("access denied.")


module.exports = {emailPassIncorrectErr, loggedInSuccessfuly, userCreatedSuccessfuly, userDeletedSuccessfuly, userUpdatedSuccessfuly, userSentSuccessfuly,
wizardNotFoundErr, wizardCreatedSuccessfuly, wizardDeletedSuccessfuly, wizardUpdatedSuccessfuly, wizardSentSuccessfuly, wizardFilledSuccessfuly, internalServerErr, accessDeniedErr, fieldsErr}