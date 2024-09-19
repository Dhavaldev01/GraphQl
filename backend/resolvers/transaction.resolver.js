import Transaction from '../models/transaction.model.js';

const transactionResolver = {
    Query: {
      transactions : async (_,args,context) =>{
        try {
            if(!context.getUser()) throw new Error("Unauthorized");
            const userId = await context.getUser()._id;

            const transactions = await Transaction.find({userId});
            return transactions;
        } catch (err) {
            console.error("Error getting transactions : " , err);
            throw new Error("Error gettting transactions");
        }
      } ,
      transaction : async(_,{ transactionId }) =>{
        try {
           const transaction = await Transaction.findById(transactionId); 
           return transaction;
        } catch (err) {
            console.error("Error getting transation : " , err);
            throw new Error("Error getting transation");
        }
      } ,
//// ToDO =>  ADD CategoryStatistics query
    },
    Mutation:{
        createTransaction : async (_, {input}, context) =>{
            try {
                const newTransation = new Transaction({
                    ...input,
                    userid : context.getUser()._id
                })
                await newTransation.save();
                return newTransation;
            } catch (error) {
                
                console.error("Error creating transaction " , err);
                throw new Error ("Error creating transaction ");
            }
        },
        updateTransaction : async (_,{input}) =>{
            try {
                const updateTransaction = await Transaction.findByIdAndUpdate(
                    input.transactionId,
                    input,
                    {new : true}
                );
                return updateTransaction;   
            } catch (error) {
                console.error("Error updating transaction " , err);
                throw new Error ("Error updating transaction "); 
            }

        },
        deleteTransaction : async (_, {transactionId}) =>{
            try {
                const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deleteTransaction;
            } catch (error) {
                console.error("Error deleting transaction : " , err);
                throw new Error("Error deleting transaction");
            }
        },
    },
    //// ToDo => Add Transatsaction/user relationship  resolver
}

export default transactionResolver;
