import React, { useState } from "react";
import { Box, Button, Divider, Input, ScrollView, Text } from "native-base";
import { selectGroups } from "../redux/groups/group-reducers";
import { useDispatch, useSelector } from "react-redux";
import SingleRegulationListItem from "./single-regulation-list-item";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import Empty from "./empty";

const GroupRegulationsForm = () => {
    
    const { createGroupRegulations } = useSelector(selectGroups);
    
    const [regulation, setRegulation] = useState("");
    const [error, setError] = useState({});
    
    const [regulations, setRegulations] = useState([...createGroupRegulations]);
    
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
    
    const dispatch = useDispatch();
    
    const handleGroupRegulationsSubmit = () => {
        if (regulations.length <= 0) {
            setError({ error, regulations: "Add at least one policy" });
            return;
        } else {
            setError({ error, regulations: null });
        }
        dispatch(GROUP_ACTION_CREATORS.saveGroupRegulations(regulations));
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
    };
    
    return (
        <ScrollView flex={1} minHeight="100%">
            <Box borderRadius={32} p={5} shadow={0} backgroundColor="white" m={2}>
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
                        backgroundColor="primary.600"
                        py={2} borderRadius={32}
                        onPress={addRegulation}
                        variant="subtle">
                        <Text color="white" fontSize="md">Add</Text>
                    </Button>
                </Box>
            </Box>
            
            <Box borderRadius={32} p={4} shadow={0} backgroundColor="white" m={2}>
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
                
                <Button
                    mt={2}
                    backgroundColor="primary.600"
                    py={2}
                    borderRadius={32}
                    onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                    variant="subtle">
                    <Text color="white" fontSize="md">Previous</Text>
                </Button>
                
                {regulations.length > 0 && (
                    <Button
                        mt={2}
                        backgroundColor="primary.600"
                        py={2}
                        borderRadius={32}
                        onPress={handleGroupRegulationsSubmit}
                        variant="subtle">
                        <Text color="white" fontSize="md">Save Regulations</Text>
                    </Button>
                )}
            
            </Box>
        </ScrollView>
    );
};

export default GroupRegulationsForm;
