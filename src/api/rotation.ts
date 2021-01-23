import logger from '../config/winston';
import client from '../lib/client';

interface IRotationResponseData {
  freeChampionIds: Array<number>;
  freeChampionIdsForNewPlayers: Array<number>;
  maxNewPlayerLevel: number;
}

type TRotationFN = () => Promise<IRotationResponseData | null>;

export const getRotationChamp: TRotationFN = async () => {
  try {
    const response = await client.get('/lol/platform/v3/champion-rotations');
    if (!response) throw new Error('AxiosResponse: response is unknown');

    return response.data as IRotationResponseData;
  } catch (err) {
    logger.error(err);
    console.error(err);
    throw new Error(err);
  }
};
