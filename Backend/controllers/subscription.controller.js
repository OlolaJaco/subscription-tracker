import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    
    try {
        const {name, price, currency, frequency, category, paymentMethod, status, startDate, renewalDate} = req.body;

        
        const subscription = await Subscription.create({
            name,
            price,
            currency,
            frequency,
            category,
            paymentMethod,
            status,
            startDate,
            renewalDate,
            user: req.user._id
        });

        res.status(201).json({success : true, data: subscription });
    } catch (error) {
        next(error)
        
    }
};