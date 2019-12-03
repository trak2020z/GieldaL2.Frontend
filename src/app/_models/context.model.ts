import { User } from './user.model';
import { Share } from './share.model';

export class Context {
    user: User;
    shares: Share[];
    buyOffers;
    sellOffers;
}
