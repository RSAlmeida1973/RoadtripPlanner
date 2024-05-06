import { Text, ScrollView } from 'react-native';
import { Card, Avatar, ListItem } from 'react-native-elements';
//import { useSelector } from 'react-redux';

const AboutScreen = () => {
    return (
        <ScrollView>
            <Card wrapperStyle={{ margin: 20 }}>
                <Card.Title>About Us</Card.Title>
                <Card.Divider />
                <Text>
                    We are just some Nucamp Bootcamp students who decided to put together this little project.  We were hoping to design a product that allows users to use ChatGPT to plan a roadtrip between two cities.  We hope to turn this into something you'll really enjoy using!
                </Text>
            </Card>
        </ScrollView>
    );
};

export default AboutScreen;