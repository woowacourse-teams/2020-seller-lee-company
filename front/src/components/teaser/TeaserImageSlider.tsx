import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import ActiveDot from "../Common/Dot/ActiveDot";
import Dot from "../Common/Dot/Dot";
import TeaserImage from "./TeaserImage";

export default function TeaserImageSlider() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const teasers = [require("../../../assets/teaser_1.jpeg")];

  const isLastIndex = () => sliderIndex === teasers.length - 1;

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        dot={isLastIndex() ? <></> : <Dot />}
        activeDot={isLastIndex() ? <></> : <ActiveDot />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        index={sliderIndex}
        onIndexChanged={setSliderIndex}
      >
        <TeaserImage
          sourceUrl={require("../../../assets/teaser_1.jpeg")}
          isLastTeaser={true}
        />
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
