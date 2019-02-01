import { ApolloError } from "apollo-client";
import React, { Fragment, ReactNode, ReactNodeArray } from "react";
import ErrorMessage from "../ErrorMessage";
import FullWidthContainer from "../FullWidthContainer";
import Heading from "../Heading";
import LoadingIcon from "../LoadingIcon";

interface IProps {
  title: string;
  loading: boolean;
  error?: ApolloError;
  children: ReactNode | ReactNodeArray;
}

const Page = ({ title, loading, error, children }: IProps) => (
  <Fragment>
    <Heading>{title}</Heading>
    <FullWidthContainer role="alert" aria-live="assertive">
      {loading ? <LoadingIcon /> : null}
      {!loading && error ? (
        <ErrorMessage isBig={true}>{error.message}</ErrorMessage>
      ) : null}
      {!loading && !error ? children : null}
    </FullWidthContainer>
  </Fragment>
);

export default Page;
