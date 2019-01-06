import { ApolloError } from "apollo-client";
import React, { Fragment, ReactNode, ReactNodeArray } from "react";
import ErrorMessage from "../ErrorMessage";
import Heading from "../Heading";
import LoadingIcon from "../LoadingIcon";
import SectionContainer from "../SectionContainer";

interface IProps {
  title: string;
  loading: boolean;
  error?: ApolloError;
  children: ReactNode | ReactNodeArray;
}

const Page = ({ title, loading, error, children }: IProps) => (
  <Fragment>
    <Heading>{title}</Heading>
    <SectionContainer role="alert" aria-live="assertive">
      {loading ? <LoadingIcon /> : null}
      {!loading && error ? (
        <ErrorMessage isBig={true}>{error.message}</ErrorMessage>
      ) : null}
      {!loading && !error ? children : null}
    </SectionContainer>
  </Fragment>
);

export default Page;
