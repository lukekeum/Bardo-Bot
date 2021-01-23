import logger from '../config/winston';
import client from '../lib/client';

interface IRotationResponseData {
  freeChampionIds: Array<number>;
  freeChampionIdsForNewPlayers: Array<number>;
  maxNewPlayerLevel: number;
}

"https://ddragon.leagueoflegends.com/cdn/10.6.1/data/ko_KR/champion.json"

type TRotationFN = () => Promise<IRotationResponseData | null>;

export const getRotationChamp: TRotationFN = async () => {
  try {
    const response = await client.get('/lol/platform/v3/champion-rotations');
    return response.data as IRotationResponseData;
  } catch (err) {
    logger.error(err);
    console.error(err);
    throw new Error(err);
  }
};
