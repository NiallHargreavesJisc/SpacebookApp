import {View} from "react-native";
import FriendsList from "../components/FriendsList";
import FriendRequests from "../components/FriendRequests";

const FriendsScreen = () => {

    return (
        <View>
            <FriendsList />
            <FriendRequests />
        </View>
    )

}

export default FriendsScreen