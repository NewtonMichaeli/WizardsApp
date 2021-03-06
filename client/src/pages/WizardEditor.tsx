// Wizard Edirot
import React, { useEffect, useState } from 'react'
// Assets:
import Add from '../assets/wizard-controllers/add-white.png'
import Loading from '../assets/loading-1.gif'
import Delete from '../assets/Q-controllers/no-grey.png'
// Redux:
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, WizardEditorActions } from '../redux'
import { wizard_editor_state_type } from '../redux/types/reducerStateTypes'
import { AddElement, MovePage, RemoveElement } from '../redux/actions/WizardEditor'
// Styles:
import Styles from '../styles/pages/WizardEditor.module.css'
import { getStyles } from '../controllers'
// Components:
import Section, { AddSectionHere } from '../components/WizardEditor/Wizard.Section'
import AddMenu from '../components/WizardEditor/AddMenu'
import { BtnAdd, BtnControlPageNavigation, BtnFinish, BtnLeave, BtnPageBack, BtnPageNext } from '../components/HeaderControllers'
import { ElementTypes } from '../redux/types'
import { AddElementAction, WizardEditorActionTypes } from '../redux/action-types/WizardEditor'
import { PushFeedback } from '../redux/actions/UI'
import { SetPageTitle } from '../redux/actions/User'


// Add Page in a certain index (path)
const AddPageHere: React.FC<{
  page_idx: number,
  noElements?: boolean
}> = ({page_idx, noElements}) => {

  const dispatch = useDispatch()
  // Dispatch Actions
  const addHereHandler = (isAppendingLeft?: boolean) => dispatch<AddElementAction>(
    AddElement.Page(
      page_idx + (isAppendingLeft ? 0 : 1)
    )
  )

  const AddHereSection: React.FC<{
    isAppendingLeft?: boolean,
    isEmptyPage?: boolean
  }> = ({isAppendingLeft, isEmptyPage}) => 
    <div className={getStyles(Styles, `Add-Page-Here ${isAppendingLeft===true
      ? "append-left"
      : ""} 
      ${isAppendingLeft===false
      ? "append-right"
      : ""} 
      ${isEmptyPage
      ? "no-elements"
      : ""}`)}>
      <section title='Add Here' onClick={()=>addHereHandler(isAppendingLeft)}>
        <img src={Add} alt="Add Here" />
      </section>
    </div>

  // Normal Page - append on specific side
  if (!noElements) return <>
    <AddHereSection isAppendingLeft={true} />
    <AddHereSection isAppendingLeft={false} />
  </>
  // No pages - append one
  else return <AddHereSection isEmptyPage />
}


const WizardEditor: React.FC = () => {
  
  // Dispatch
  const dispatch = useDispatch()
  useEffect(() => {dispatch(SetPageTitle('Edit'))}, [])  // -- set title current page
  // States:
  const { ActionTrigger, ActionType, WizardState, Page, PageIdx } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  const [ElementsListMode, setElementsListMode] = useState(false)   // -- toggling element's list
  const { SaveChanges } = bindActionCreators<RootState, any>(WizardEditorActions, dispatch)
  // Handlers
  const closeAddMenuHandler = () => {
    if (!ElementsListMode)
      setElementsListMode(true)
    else {
      dispatch({type: 'ABORT_ELEMENT_MODE'})
      setElementsListMode(false)
    }
  }
  const deletePageHandler = () => {
    dispatch(RemoveElement.Page(PageIdx))
    dispatch(PushFeedback(true, "Page removed successfully."))
  }
  const changePageNavigationStatusHandler = () => {
    dispatch({type: WizardEditorActionTypes.CHANGE_PAGE_NAVIGATION_STATUS})
    dispatch(PushFeedback(true, WizardState?.canNavigate
      ? 'Page Navigation is now Enabled'
      : 'Page Navigation is now Disabled'))
  }


  console.log(WizardState?.DoC)
  console.log(WizardState?.canNavigate)
  if (WizardState) return (
    <div className={Styles["WizardStats"]}>
      <div className={Styles["wizard-content-container"]}>
        {/* header */}
        <section className={Styles["container-header"]}>
          <h1 className={Styles["wizard-title"]}>
            Currently Editing: {WizardState?.name}
          </h1>
          <h5 className={Styles["page-counter"]}>
            Page {
              PageIdx + (WizardState?.pages.length ? 1 : 0)
            } out of {WizardState?.pages.length}
          </h5>
          <div className={Styles["page-controllers"]}>
            <BtnControlPageNavigation onClick={changePageNavigationStatusHandler} />
            <BtnPageBack onClick={()=>dispatch(MovePage('BACK'))} />
            <BtnPageNext onClick={()=>dispatch(MovePage('NEXT'))} />
            <BtnLeave />
            <BtnFinish onClick={SaveChanges} />
            <BtnAdd focus={ElementsListMode} onClick={closeAddMenuHandler} />
            { ElementsListMode && <AddMenu /> }
          </div>
        </section>
        {/* {body */}
        <section className={Styles["container-body"]}>

          {/* Add Page here (if 0 pages found) */}
          { !Page
            && <AddPageHere page_idx={0} noElements />}

          {/* Add page here */}
          {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
            && ActionTrigger.Type === ElementTypes.PAGE 
            && <AddPageHere page_idx={PageIdx} />}
          {/* Add sections here (if 0 sections exist) */}
          { Page
            && !Page?.length
            && <AddSectionHere path={{page: PageIdx, section: 0}} noElements />}

          {/* map through sections */}
          {Page?.map((section, i) => 
            <Section 
              key={i}
              page_idx={PageIdx} 
              section_idx={i}
              section={section} />
          )}

          {/* delete page button */}
          {
            Page &&
            <button className={Styles["delete-page"]} title="Delete Page" onClick={deletePageHandler}>
              <img src={Delete} alt="Delete Page" />
            </button>
          }

        </section>
      </div>
    </div>
  )
  else return (
    <div className={Styles["WizardStats"]}>
        <div className={getStyles(Styles, "wizard-content-container wizard-content-container-loading")}>
          <img src={Loading} alt="Loading Wizard.." />
        </div>
    </div>
  )
}

export default WizardEditor
