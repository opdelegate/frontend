import { HStack, Text, Box } from '@chakra-ui/react';
import { formatNumber } from '../utils/functions';
import _ from 'lodash';

export const CustomChartTooltip = ({ payload, active, label }: any) => {
  //   console.log(active, payload);
  if (active) {
    return (
      <Box
        background="white"
        boxShadow=" 0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
        borderRadius="5px"
        p={2}
      >
        <HStack justifyContent="space-between">
          <Text color="rgba(0, 0, 0, 0.7)">Date</Text>
          <Text as="b">{payload?.[0]?.payload?.date}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color="rgba(0, 0, 0, 0.7)">
            {_.startCase((payload?.[0]?.name ?? '') as string)}
          </Text>
          <Text as="b">
            {formatNumber(
              payload?.[0]?.payload?.quantity ?? payload?.[0]?.payload?.change,
            )}
          </Text>
        </HStack>
      </Box>
    );
  }

  return null;
};
