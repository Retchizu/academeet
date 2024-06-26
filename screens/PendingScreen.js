import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useUserContext } from "../context/UserContext"; // Import the user context
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { pendingHeaderBack } from "../misc/loadSVG";
import { db } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const PendingScreen = () => {
  const navigation = useNavigation();
  const { user } = useUserContext(); // Get user data from the context
  const handleBackPress = () => {
    navigation.goBack();
  };

  /*  const isPendingAccepted = async () => {
    const doc = await db.collection("User").doc(user.userName).get();
    const currentUserLikedProfile = doc.data().userLikedProfile;
    if (!currentUserLikedProfile) return;
    currentUserLikedProfile.forEach(async (profile) => {
      const likedProfile = await db
        .collection("User")
        .doc(profile.userName)
        .get();
      const userLikedProfile = likedProfile.data().userLikedProfile;
      if (!userLikedProfile || userLikedProfile === null) return;
      console.log(userLikedProfile);
      userLikedProfile.forEach(async (otherProfile) => {
        if (profile.userName === otherProfile.userName) {
          await db
            .collection("User")
            .doc(user.userName)
            .update({
              userFriend: [...user.userFriend, otherProfile],
            });
          const otherProfile = await db
            .collection("User")
            .doc(otherProfile.userName)
            .get();
          const otherProfileFriend = otherProfile.data().userFriend;

          if (otherProfileFriend) {
            await db
              .collection("User")
              .doc(otherProfile.userName)
              .update({
                userFriend: [...otherProfileFriend, user],
              });
          } else {
            await db.collection("User").doc(otherProfile.userName).update({
              userFriend: user,
            });
          }
        }
      });
    });
  };

  useEffect(() => {
    isPendingAccepted();
  }); */
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => handleBackPress()}
          style={styles.button}
        >
          <SvgXml xml={pendingHeaderBack} style={styles.svgIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>pending</Text>
      </View>

      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.profileList}>
          {user.userLikedProfile ? (
            user.userLikedProfile.map((user, index) => (
              <TouchableOpacity
                key={user.userName}
                style={styles.profileContainer}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("VisitProfileScreen", { user })
                }
              >
                <Image
                  source={{ uri: user.imageUri }}
                  style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.profileName}>{user.fullName}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <>
              <Text>No Pending</Text>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    backgroundColor: "#023E8A",
  },
  headerTitle: {
    textAlign: "center",
    fontFamily: "lato-regular",
    fontSize: hp(3),
    color: "#FF9E00",
  },
  button: {
    position: "absolute",
    left: hp(2.8),
  },
  svgIcon: {},
  scrollViewContainer: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  profileList: {
    flex: 1,
  },
  profileContainer: {
    backgroundColor: "#0077B6",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(1),
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    borderRadius: wp(6),
  },
  profileImage: {
    borderRadius: hp(2),
    width: hp(12),
    height: hp(12),
  },
  textContainer: {
    width: wp(50),
    marginLeft: hp(2),
  },
  profileName: {
    fontSize: hp(1.8),
    color: "#FFFFFF",
  },
});
