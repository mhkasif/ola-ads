/* eslint-disable react-hooks/exhaustive-deps */
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {appendAdsAction, getAdsAction} from 'redux/adsActions/adsActions';
import {connect} from 'react-redux';
import {RefreshControl} from 'react-native';

import PostCard from '@components/PostCard/PostCard';
import {Box, Spinner} from 'native-base';
import CustomText from '@components/CustomText/CustomText';
const LOADING_TYPE = {
  REFRESH: 'REFRESH',
  PAGINATION: 'PAGINATION',
};
const AdsList = ({
  getAdsAction,
  appendAdsAction,
  ads: adsState = {},
  status,
}) => {
  const {pagination, ads} = adsState;
  const filterAds =
    ads?.filter(ad => (!status ? true : ad.status === status)) || [];

  const [loadingType, setLoadingType] = useState('');
  const hasMorePages = pagination?.hasNextPage || false;
  const fetchingAdsRef = useRef(false);
  const fetchAds = useCallback(async () => {
    setLoadingType(LOADING_TYPE.REFRESH);
    await getAdsAction();
    fetchingAdsRef.current = false;
    setLoadingType('');
  }, [getAdsAction]);

  const fetchMoreData = async () => {
    console.log('loading fetch More data', loadingType);
    if (!hasMorePages || loadingType || fetchingAdsRef.current) {
      return;
    }
    setLoadingType(LOADING_TYPE.PAGINATION);
    await appendAdsAction();
    setLoadingType('');
  };

  useEffect(() => {
    fetchingAdsRef.current = true;
    fetchAds();
  }, [fetchAds]);

  const renderItem = useCallback(({item}) => {
    console.log({item});
    return <PostCard {...item} />;
  }, []);

  const renderEmpty = useCallback(() => {
    return <EmptyComponent loading={loadingType} />;
  }, [loadingType]);
  const renderFooter = useCallback(() => {
    return (
      <FooterComponent
        hasMorePages={hasMorePages}
        loading={LOADING_TYPE.PAGINATION === loadingType}
      />
    );
  }, [pagination?.hasNextPage, loadingType]);
  return (
    <>
      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={loadingType === LOADING_TYPE.REFRESH}
            onRefresh={fetchAds}
          />
        }
        estimatedItemSize={60}
        data={filterAds || []}
        renderItem={renderItem}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
      />
    </>
  );
};

const EmptyComponent = ({loading}) => {
  return loading ? (
    <></>
  ) : (
    <CustomText textAlign="center">No Ads to Display</CustomText>
  );
};
const FooterComponent = ({hasMorePages, loading}) => {
  return (
    <Box py={3} my={2}>
      {loading ? (
        <Spinner size="sm" />
      ) : !hasMorePages ? (
        <CustomText textAlign="center">No More Ads to Display</CustomText>
      ) : (
        <></>
      )}
    </Box>
  );
};
const mapStateToProps = state => ({
  ads: state.ads,
});
const actions = {
  getAdsAction,
  appendAdsAction,
};
export default connect(mapStateToProps, actions)(AdsList);
