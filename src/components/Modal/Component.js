import * as React from 'react'
import Modal from 'react-native-modal'

const RenderModal = ({ children, visible }) => {
    return (
        <Modal useNativeDriver style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={visible} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={30} animationOutTiming={30}>
            {children}
        </Modal>
    )
}

export default RenderModal