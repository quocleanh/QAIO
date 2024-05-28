import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const PopupBottom = ({ children }: { children: React.ReactNode }) => {
  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    const bottomSheetRef = useRef<RBSheet>(null);
    bottomSheetRef.current?.open();
  };

  return (
    <View>
      <TouchableOpacity onPress={openBottomSheet}>
        {children}
      </TouchableOpacity>


      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        animationType="slide"
      >
        {/* Your content */}
      </RBSheet>
    </View>
  );
};

export default PopupBottom;
