import { state } from './../index'

function destroy(): void {
  while (state.synchronizers.length > 0) {
    const synchronizer = state.synchronizers.pop()

    synchronizer.destroy()
  }
}

export default destroy
