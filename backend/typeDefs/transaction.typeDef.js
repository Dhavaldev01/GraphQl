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
    }

    type Mutation{
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransation(input: UpdateTransationInput!): Transaction!
        deleteTransation(transactionId:ID!): Transaction!
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