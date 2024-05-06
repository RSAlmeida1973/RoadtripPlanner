import { Text } from 'react-native';
import { Card } from 'react-native-elements';

const DirectionsScreen = () => {
    return (
        <Card>
            <Card.Title>Directions on how to use this tool:</Card.Title>
            <Card.Divider />
            <Text style={{margin: 10}}>
                Step 1: fill in the two input fields with your starting location and you end destination.{"\n\n"}
                Step 2: Click Submit.{"\n\n"}
                Step 3: Take a look at the results given back.{"\n\n"}
                Step 4: (optional) Print out the page or take a screenshot for your future reference.{"\n\n"}
            </Text>
        </Card>
    )
}

export default DirectionsScreen;