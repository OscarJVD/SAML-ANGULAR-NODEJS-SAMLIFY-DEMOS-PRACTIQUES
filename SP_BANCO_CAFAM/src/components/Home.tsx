import React, { useState, useEffect, ReactNode } from "react";
import { RouteComponentProps } from "react-router";
import { parse } from "query-string";
import axios from "axios";

import "./index.css";

const LOCALSTORAGE_TOKEN_FIELD = "auth_token";

type Props = RouteComponentProps & {};

type Profile = {
  email: string;
};

type SamlOption = {
  encrypted: boolean;
};

const Container = (props: { children: ReactNode }) => {
  return (
    <div className="vh-100 system-sans-serif flex flex-column items-center justify-center">
      {props.children}
    </div>
  );
};

const Button = (props: { children: ReactNode; onClick: Function }) => {
  return (
    <button
      style={{ border: "1px solid #aaa" }}
      className="pa3 bg-transparent ma2 br3 f6 silver-gray outline-0 pointer"
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
};

export function Home(props: Props) {
  console.log(props);

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({ email: null });
  const [samlOption, setSamlOption] = useState<SamlOption>({ encrypted: true });

  const parseQuery = () => {
    console.log("--------->>>", samlOption);
    const query = samlOption.encrypted ? "?encrypted=true" : "";
    return query;
  };

  const initRedirectRequest = () => {
    window.location.href = `/sso/redirect${parseQuery()}`;
  };

  const initPostRequest = () => {
    window.location.href = `/sso/post${parseQuery()}`;
  };

  const viewSpMetadata = () => {
    window.open(`/sp/metadata${parseQuery()}`);
  };

  const viewIdpMetadata = () => {
    window.open(`/idp/metadata${parseQuery()}`);
  };

  const logout = () => {
    window.localStorage.removeItem(LOCALSTORAGE_TOKEN_FIELD);
    setAuthenticated(false);
    setProfile({ email: null });
  };

  // initialize single logout from sp side
  const singleLogoutRedirect = () => {
    window.location.href = `/sp/single_logout/redirect${parseQuery()}`;
  };

  const getProfile = async (token: string) => {
    try {
      const { data } = await axios.get<{ profile: Profile }>("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);
      setAuthenticated(true);
      setProfile(data.profile);
    } catch (e) {
      setAuthenticated(false);
      setProfile({ email: null });
      window.localStorage.removeItem(LOCALSTORAGE_TOKEN_FIELD);
    }
  };

  const toggleEncrypted = () => {
    setSamlOption({
      ...samlOption,
      encrypted: !samlOption.encrypted,
    });
  };

  const init = async () => {
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_FIELD);
    // if the token is already stored in localstoarge, call the service to verify if it's expired
    // if anything wrong, go back to the login scene
    if (token) {
      // verify the current auth token
      return await getProfile(token);
    }

    console.log(props);
    // this section
    const params = parse(props.location.search);
    if (params.auth_token) {
      window.localStorage.setItem(LOCALSTORAGE_TOKEN_FIELD, params.auth_token);
      await getProfile(params.auth_token);
      // remove the auth_token part in
      props.history.replace("/");
    }
    // initial state
  };

  useEffect(() => {
    init();
    return () => null;
  }, []);

  if (!authenticated) {
    return (
      <Container>
        <div className="">
          <Button onClick={() => initRedirectRequest()}>Okta - redirect</Button>
          <Button onClick={() => initPostRequest()}>Okta - post</Button>
          <Button onClick={() => viewSpMetadata()}>SP Metadata</Button>
          <Button onClick={() => viewIdpMetadata()}>Okta Metadata</Button>
        </div>
        <div className="pb2 f6 silver mv3 bb b--black-20 bw1 tc">Options</div>
        <div>
          <label className="cb-container f6 silver flex">
            <span>with encryption</span>
            <input
              type="checkbox"
              defaultChecked={samlOption.encrypted}
              onClick={() => toggleEncrypted()}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </Container>
    );
  }
  {
    /** render screen after login in */
  }
  return (
    <Container>
      <div className="flex flex-column">
        <span className="mb3">
          Welcome back <b>{profile.email}</b>
        </span>
        <Button onClick={() => logout()}>Logout</Button>
        <Button onClick={() => singleLogoutRedirect()}>
          Single Logout (Redirect)
        </Button>
      </div>
    </Container>
  );
}
