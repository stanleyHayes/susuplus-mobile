import React, { useEffect, useState } from "react";
import { Box, Button, Center, Divider, Flex, Input, ScrollView, Spinner, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups } from "../../redux/groups/group-reducers";
import { GROUP_ACTION_CREATORS } from "../../redux/groups/group-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import Empty from "../../components/empty";
import SingleRegulationListItem from "../../components/single-regulation-list-item";

const UpdateGroupDetailScreen = ({ navigation, route }) => {
    
    const { groupID } = route.params;
    const { groupDetail, groupLoading } = useSelector(selectGroups);
    const { authToken } = useSelector(selectAuth);
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [susuPercentage, setSusuPercentage] = useState("");
    const [investmentPercentage, setInvestmentPercentage] = useState("");
    const [regulations, setRegulations] = useState([]);
    
    const [regulation, setRegulation] = useState("");
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(GROUP_ACTION_CREATORS.getGroup(authToken, groupID));
    }, []);
    
    useEffect(() => {
        if (groupDetail) {
            setDescription(groupDetail.description);
            setName(groupDetail.name);
            setSusuPercentage(groupDetail.percentages.susu.toString());
            setInvestmentPercentage(groupDetail.percentages.investment.toString());
            setRegulations(groupDetail.regulations);
        }
    }, []);
    
    const addRegulation = () => {
        if (!regulation) {
            setError({ error, regulation: "Field Required" });
            return;
        } else {
            setError({ error, regulation: null });
        }
        setRegulations([...regulations, regulation]);
        setRegulation("");
    };
    
    const removeRegulation = i => {
        setRegulations(regulations.filter((regulation, index) => i !== index));
    };
    
    const [error, setError] = useState({ susuPercentage: null, investmentPercentage: null });
    
    const handleSaveGroupBasicInfo = () => {
        
        if (!name) {
            setError({ error, name: "Field Required" });
            return;
        } else {
            setError({ error, name: null });
        }
        
        if (!investmentPercentage) {
            setError({ error, investmentPercentage: "Field Required" });
            return;
        } else {
            setError({ error, investmentPercentage: null });
        }
        
        if (!susuPercentage) {
            setError({ error, susuPercentage: "Field Required" });
            return;
        } else {
            setError({ error, susuPercentage: null });
        }
        
        if (parseInt(investmentPercentage) + parseInt(susuPercentage) !== 100) {
            setError({
                error,
                susuPercentage: "Percentages must add up to 100",
                investmentPercentage: "Percentages must add up to 100",
            });
            return;
        } else {
            setError({ error, susuPercentage: null, investmentPercentage: null });
        }
        
        if (!description) {
            setError({ error, description: "Field Required" });
            return;
        } else {
            setError({ error, description: null });
        }
        
        if (regulations.length === 0) {
            setError({ error, regulations: "There should be at least a single regulation" });
        } else {
            setError({ error, regulations: null });
        }
        
        dispatch(GROUP_ACTION_CREATORS.updateGroup(
            authToken,
            { name, susuPercentage, investmentPercentage, description, regulations },
            groupID,
            navigation,
        ));
    };
    
    
    return (
        <ScrollView>
            {groupLoading &&
            (<Center p={3}>
                <Spinner size={50} color="primary.600" />
            </Center>)}
            <Flex flex={1} m={2}>
                <Box
                    borderRadius={32}
                    p={4}
                    shadow={0}
                    backgroundColor="white">
                    <Box mb={2}>
                        <Text mb={1} fontSize="xs">Group Name</Text>
                        <Input
                            placeholder="Name"
                            variant="filled"
                            borderRadius={32}
                            py={4}
                            px={4}
                            isInvalid={Boolean(error.name)}
                            _focus={{ borderColor: "gray.50" }}
                            _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                            isFullWidth={true}
                            backgroundColor="gray.50"
                            size="lg"
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
                        <Text mb={1} fontSize="xs">Susu Percentage</Text>
                        <Input
                            placeholder="What percentage goes to susu?"
                            variant="filled"
                            borderRadius={32}
                            py={4}
                            size="lg"
                            keyboardType="number-pad"
                            px={4}
                            isInvalid={Boolean(error.susuPercentage)}
                            _focus={{ borderColor: "gray.50" }}
                            _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                            isFullWidth={true}
                            backgroundColor="gray.50"
                            mb={1}
                            value={susuPercentage}
                            name="susuPercentage"
                            onChangeText={susuPercentage => setSusuPercentage(susuPercentage)}
                            isRequired={true}
                        />
                        {error.susuPercentage && <Text color="error.400">{error.susuPercentage}</Text>}
                    </Box>
                    
                    <Box mb={2}>
                        <Text mb={1} fontSize="xs">Investment Percentage</Text>
                        <Input
                            placeholder="What percentage goes to investment?"
                            variant="filled"
                            borderRadius={32}
                            py={4}
                            px={4}
                            size="lg"
                            keyboardType="number-pad"
                            isInvalid={Boolean(error.investmentPercentage)}
                            _focus={{ borderColor: "gray.50" }}
                            _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                            isFullWidth={true}
                            backgroundColor="gray.50"
                            mb={1}
                            value={investmentPercentage}
                            name="investmentPercentage"
                            onChangeText={investmentPercentage => setInvestmentPercentage(investmentPercentage)}
                            isRequired={true}
                        />
                        {error.susuPercentage && <Text color="error.400">{error.investmentPercentage}</Text>}
                    </Box>
                    
                    <Box>
                        <Text mb={1} fontSize="xs">Group Description</Text>
                        <Input
                            placeholder="What is the group about?"
                            variant="filled"
                            borderRadius={32}
                            py={4}
                            px={4}
                            size="lg"
                            backgroundColor="gray.50"
                            isInvalid={Boolean(error.description)}
                            _focus={{ borderColor: "gray.50" }}
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
                </Box>
                
                <Box
                    borderRadius={32}
                    p={4}
                    shadow={0}
                    backgroundColor="white"
                    my={2}>
                    <Text textAlign="center" fontSize="lg">Group Regulations</Text>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box mb={2}>
                        <Input
                            placeholder="Type regulation"
                            variant="filled"
                            borderRadius={32}
                            py={4}
                            px={4}
                            isInvalid={Boolean(error.regulation)}
                            _focus={{ borderColor: "gray.50" }}
                            _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                            isFullWidth={true}
                            backgroundColor="gray.50"
                            mb={1}
                            size="lg"
                            multiline={true}
                            value={regulation}
                            name="regulation"
                            type="text"
                            onChangeText={regulation => setRegulation(regulation)}
                            isRequired={true}
                        />
                        {error.regulation && <Text color="error.400">{error.regulation}</Text>}
                        
                        <Button
                            mt={2}
                            borderWidth={1}
                            borderColor="primary.600"
                            backgroundColor="white"
                            py={2}
                            borderRadius={32}
                            onPress={addRegulation}
                            variant="subtle">
                            <Text color="primary.600" fontSize="md">Add</Text>
                        </Button>
                    </Box>
                </Box>
                
                <Box
                    borderRadius={32}
                    p={4}
                    shadow={0}
                    my={4}
                    backgroundColor="white">
                    <Text textAlign="center" fontSize="lg">Group Regulations ({regulations.length})</Text>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box>
                        {
                            regulations && regulations.length === 0 ? (
                                <Box>
                                    <Empty description="No regulations yet" title="Group Regulations" />
                                </Box>
                            ) : (
                                regulations.map((regulation, index) => {
                                    return (
                                        <SingleRegulationListItem
                                            key={index}
                                            regulation={regulation}
                                            index={index}
                                            showDelete={true}
                                            removeRegulation={removeRegulation}
                                        />
                                    );
                                })
                            )
                        }
                    </Box>
                </Box>
                
                <Button
                    onPress={handleSaveGroupBasicInfo}
                    borderRadius={32}
                    py={2}
                    backgroundColor="primary.600"
                    variant="solid">
                    <Text color="white" fontSize="md">Update Group Info</Text>
                </Button>
            </Flex>
        </ScrollView>
    );
};

export default UpdateGroupDetailScreen;
