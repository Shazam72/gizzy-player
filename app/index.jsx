import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useCallback, useContext } from "react";
import MediaContext from "../contexts/media";
import AudioItem from "../components/AudioItem";
import OptionModal from "../components/OptionModal";

export default function index() {
  // const { audioList } = useContext(MediaContext);
  // const [modal, setModal] = useState({
  //   item: {},
  //   visible: false,
  // });

  // const onOptionPress = useCallback((item) => {
  //   setModal((v) => ({ ...v, visible: true, item }));
  // });
  // const onCloseModal = useCallback(() =>
  //   setModal({ item: {}, visible: false })
  // );
  // const renderItem = useCallback((props) => (
  //   <AudioItem onOptionPress={onOptionPress} {...props} />
  // ));

  return (
    <SafeAreaView>
      <View>
        <Text>Hello</Text>
      </View>
      {/* <FlatList
        style={styles.listContainer}
        data={audioList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={7}
        contentContainerStyle={{ gap: 10 }}
      />
      {modal.visible && <OptionModal onClose={onCloseModal} {...modal} />} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
});
