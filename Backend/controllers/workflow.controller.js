import { serve } from '@upstash/workflow/express';
import Subscription from '../models/subscription.model';

export const sendReminders = serve( async () => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);
});

if (!subscription || subscription.status)



const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', select: 'name email')
    })
}