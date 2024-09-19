

const transactionTypeDef = `#graphql
    type Transaction {
        _id:ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        data: String!
    }

    type Query{
        transactions:[Transaction!]
        transaction(transactionId:ID):Transaction  
        # //// ToDO =>  ADD CategoryStatistics query
    }

    type Mutation{
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransationInput!): Transaction!
        deleteTransaction(transactionId:ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        date: String!
        location: String
    }

    input UpdateTransationInput {
        transactionId:ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        date: String
        location: String
        data: String
    }
`

export default transactionTypeDef;