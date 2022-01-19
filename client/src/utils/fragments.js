import { gql } from "@apollo/client";

export const SPARK_FIELDS = gql`
  fragment SparkFields on Spark {
    _id
    title
    description
  }
`;
export const SPARK_RECURSIVE = gql`
  fragment SparkRecursive on Spark {
    sparks {
      ...SparkFields
      sparks {
        ...SparksFields
        sparks {
          ...SparksFields
          sparks {
            ...SparksFields
            sparks {
              ...SparksFields
            }
          }
        }
      }
    }
  }
`;
