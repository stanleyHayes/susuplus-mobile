import React, { useState } from "react";
import { ScrollView, Text, Divider, Box, Input, Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import SingleRegulationListItem from "./single-regulation-list-item";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import { selectSusu } from "../redux/susu/susu-reducer";
import { SUSU_ACTION_CREATORS } from "../redux/susu/susu-action-creators";

const SusuRegulationsForm = () => {
    
    const { createSusuRegulations } = useSelector(selectSusu);
    
    const [regulation, setRegulation] = useState("");
    const [error, setError] = useState({});
    
    const [regulations, setRegulations] = useState([...createSusuRegulations]);
    
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
            setError({ error, regulations: "Add at least one regulation" });
            return;
        } else {
            setError({ error, regulations: null });
        }
        dispatch(SUSU_ACTION_CREATORS.saveSusuRegulations(regulations));
        dispatch(SUSU_ACTION_CREATORS.susuGoToNextPage());
    };
    
    return (
        <ScrollView flex={1} minHeight="100%">
            <Box borderRadius={32} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="lg">Susu Regulations</Text>
                
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
                <Text textAlign="center" fontSize="lg">Susu Regulations ({regulations.length})</Text>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    {regulations.map((regulation, index) => {
                        return (
                            <SingleRegulationListItem
                                key={index}
                                regulation={regulation}
                                showDelete={true}
                                index={index}
                                removeRegulation={removeRegulation}
                            />
                        );
                    })}
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

export default SusuRegulationsForm;
