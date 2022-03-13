import React from 'react';
import {View} from 'react-native';
import ProfileTopper from "../components/ProfileTopper";
import Posts from "../components/PostListComponent";
import WritePost from "../components/WritePost";
import Header from "../components/Header";
import styles from "../assets/styles/Style";

const Profile = ({route}) => {
    const profileId  = route.params;
    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <ProfileTopper profileId={profileId.profileId} />
                <WritePost profileId={profileId.profileId} />
                <Posts profileId={profileId.profileId} />
            </View>
        </View>
    )

}

export default Profile