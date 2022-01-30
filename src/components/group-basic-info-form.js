import React, { useState } from "react";
import { Box, Button, Divider, Input, ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import { selectGroups } from "../redux/groups/group-reducers";

const GroupBasicInfoForm = () => {
    const {createGroupBasicInfo} = useSelector(selectGroups);

    const [name, setName] = useState(createGroupBasicInfo.name);
    const [description, setDescription] = useState(createGroupBasicInfo.description);
    const [susuPercentage, setSusuPercentage] = useState(createGroupBasicInfo.susuPercentage);
    const [investmentPercentage, setInvestmentPercentage] = useState(createGroupBasicInfo.investmentPercentage);
    const [error, setError] = useState({ susuPercentage: null, investmentPercentage: null });

    const dispatch = useDispatch();

    const handleSaveGroupBasicInfo = () => {

        if(!name){
            setError({error, name: 'Field Required'});
            return;
        }else {
            setError({error, name: null});
        }

        if(!investmentPercentage){
            setError({error, investmentPercentage: 'Field Required'});
            return;
        }else {
            setError({error, investmentPercentage: null});
        }

        if(!susuPercentage){
            setError({error, susuPercentage: 'Field Required'});
            return;
        }else {
            setError({error, susuPercentage: null});
        }

        if(parseInt(investmentPercentage) + parseInt(susuPercentage) !== 100){
            setError({error, susuPercentage: 'Percentages must add up to 100',investmentPercentage: 'Percentages must add up to 100' });
            return;
        }else {
            setError({error, susuPercentage: null, investmentPercentage: null});
        }

        if(!description){
            setError({error, description: 'Field Required'});
            return;
        }else {
            setError({error, description: null});
        }

        dispatch(GROUP_ACTION_CREATORS.saveGroupBasicInfo({name, susuPercentage, investmentPercentage, description}));
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
    };


    return (
        <ScrollView p={2}>
            <Box borderBottomLeftRadius={0}
                 borderTopRightRadius={0}
                 borderBottomRightRadius={16}
                 borderTopLeftRadius={16} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text fontSize="sm" color="muted.400">Group Basic Info</Text>

                <Divider width="100%" my={2} />

                <Box mb={2}>
                    <Input
                        placeholder="Name"
                        variant="outline"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        px={4}
                        isInvalid={Boolean(error.name)}
                        _focus={{ borderColor: "gray.200" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        mb={1}
                        value={name}
                        name="name"
                        autoCapitalize="words"
                        onChangeText={name => setName(name)}
                        isRequired={true}
                    />
                    {error.name && <Text color="error.400">{error.name}</Text>}
                </Box>


                <Box mb={2}>
                    <Input
                        placeholder="What percentage goes to susu?"
                        variant="outline"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        keyboardType="number-pad"
                        px={4}
                        isInvalid={Boolean(error.susuPercentage)}
                        _focus={{ borderColor: "gray.200" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        mb={1}
                        value={susuPercentage}
                        name="susuPercentage"
                        onChangeText={susuPercentage => setSusuPercentage(susuPercentage)}
                        isRequired={true}
                    />
                    {error.susuPercentage && <Text color="error.400">{error.susuPercentage}</Text>}
                </Box>

                <Box mb={2}>
                    <Input
                        placeholder="What percentage goes to investment?"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        px={4}
                        keyboardType="number-pad"
                        isInvalid={Boolean(error.investmentPercentage)}
                        _focus={{ borderColor: "gray.200" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        variant="outline"
                        mb={1}
                        value={investmentPercentage}
                        name="investmentPercentage"
                        onChangeText={investmentPercentage => setInvestmentPercentage(investmentPercentage)}
                        isRequired={true}
                    />
                    {error.susuPercentage && <Text color="error.400">{error.investmentPercentage}</Text>}
                </Box>

                <Box mb={4}>
                    <Input
                        placeholder="What is the group about?"
                        variant="outline"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        px={4}
                        isInvalid={Boolean(error.description)}
                        _focus={{ borderColor: "gray.200" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        mb={1}
                        multiline={true}
                        value={description}
                        name="description"
                        onChangeText={description => setDescription(description)}
                        isRequired={true}
                    />
                    {error.description && <Text color="error.400">{error.description}</Text>}
                </Box>

                <Button
                    onPress={handleSaveGroupBasicInfo}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    _text={{color: 'white', fontSize: 'xs'}}
                    py={3}
                    backgroundColor="primary.600"
                    variant="solid">
                    Save Basic Info
                </Button>
            </Box>
        </ScrollView>
    );
};

export default GroupBasicInfoForm;
