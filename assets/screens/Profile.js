import React from 'react';
import {View, Button} from 'react-native';
import ProfileTopper from "../components/ProfileTopper";
import Posts from "../components/PostListComponent";
import WritePost from "../components/WritePost";
import Header from "../components/Header";

const Profile = ({route}) => {
    const profileId  = route.params;
    console.log(profileId)
    console.log(profileId.valueOf())
    console.log(profileId.profileId)
    return(
        <View>
            <Header />
            <ProfileTopper profileId={profileId.profileId} />
            <WritePost profileId={profileId.profileId} />
            <Posts profileId={profileId.profileId} />
        </View>
    )

}

export default Profile