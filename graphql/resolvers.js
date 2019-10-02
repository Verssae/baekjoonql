import { getProblems, getRecentProblem, versus } from "./db";

const resolvers = {
  Query: {
    problems: (_, { id }) => getProblems(id),
    problem: (_, {id}) => getRecentProblem(id),
    versus: (_, {id1, id2}) => versus(id1, id2)
  }
};

export default resolvers;