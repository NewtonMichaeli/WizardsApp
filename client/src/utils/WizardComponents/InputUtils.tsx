// Input controllers field


// const InputControllers: React.FC<{
//   children: JSX.Element | string
// }> = ({children}) => {
//   return (
//     <section className={Styles["question-controllers"]}>
//       <img src={Required} alt="Required" title='Set to Required' />
//       <img src={Remove} alt="Remove" title='Remove Question' />
//       <img src={Options} alt="Options" title='Options' />
//     </section>
//   )
// }


// Add Question in a certain index (path)
// export const AddInputHere: React.FC<{
//   path: input_path_type, 
//   lastOne?: boolean,
//   noElements?: boolean
// }> = ({path, lastOne, noElements}) => {

//   const dispatch = useDispatch()
//   // Dispatch Actions
//   const addHereHandler = (lastAddHere?: boolean) => dispatch<AddElementAction>(
//     AddElement.Question({
//       ...path,
//       question: path.question + (lastAddHere ? 1 : 0)
//     })
//   )

//   const AddHereSection: React.FC<{
//     isLastElement?: boolean,
//     isEmptySection?: boolean
//   }> = ({isLastElement, isEmptySection}) => 
//     <div className={getStyles(Styles, `Add-Input-Here ${isLastElement
//       ? "last-element"
//       : ""} 
//       ${isEmptySection
//       ? "no-elements"
//       : ""}`)}>
//       <section title='Add Here' onClick={()=>addHereHandler(isLastElement)}>
//         <img src={Add} alt="Add Here" />
//       </section>
//     </div>

//   return (
//     <>
//       <AddHereSection isEmptySection={noElements} />
//       { lastOne && <AddHereSection isLastElement /> }
//     </>
//   )
// }

export default 5