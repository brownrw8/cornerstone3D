import { state } from '../../store'
import getActiveToolForMouseEvent from '../shared/getActiveToolForMouseEvent'
import { selectToolData } from '../../stateManagement/annotation/toolDataSelection'
import { EventsTypes } from '../../types'

/**
 * If the `mouseDown` handler does not consume an event,
 * activate the creation loop of the active tool, if one is found for the
 * mouse button pressed.
 *
 * @param evt - The normalized mouseDown event.
 */
export default function mouseDownActivate(
  evt: EventsTypes.NormalizedMouseEventType
) {
  // If a tool has locked the current state it is dealing with an interaction within its own eventloop.
  if (state.isInteractingWithTool) {
    return
  }

  const activeTool = getActiveToolForMouseEvent(evt)

  if (!activeTool) {
    return
  }

  if (state.isMultiPartToolActive) {
    return
  }

  if (activeTool.addNewMeasurement) {
    selectToolData(activeTool.addNewMeasurement(evt, 'mouse'))
  }
}
