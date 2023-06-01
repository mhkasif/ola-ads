/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {appendAdsAction, getAdsAction} from 'redux/adsActions/adsActions';

import CustomText from '@components/CustomText/CustomText';
import PostCard from '@components/PostCard/PostCard';
import {Box, Spinner} from 'native-base';
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
    fetchingAdsRef.current = true;
    setLoadingType(LOADING_TYPE.REFRESH);
    await getAdsAction();
    fetchingAdsRef.current = false;
    setLoadingType('');
  }, [getAdsAction]);

  const fetchMoreData = async () => {
    console.log('loading fetch More data', loadingType);
    if (loadingType || fetchingAdsRef.current || !hasMorePages) {
      return;
    }
    setLoadingType(LOADING_TYPE.PAGINATION);
    await appendAdsAction();
    setLoadingType('');
  };

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const renderItem = useCallback(({item}) => {
    return <PostCard key={item._id} {...item} />;
  }, []);

  const renderEmpty = useCallback(() => {
    return <EmptyComponent loading={loadingType} />;
  }, [loadingType]);
  const renderFooter = useCallback(() => {
    return (
      <FooterComponent
        ads={filterAds}
        hasMorePages={hasMorePages}
        loading={LOADING_TYPE.PAGINATION === loadingType}
      />
    );
  }, [pagination?.hasNextPage, loadingType, adsState]);
  return (
    <>
      <FlatList
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
const FooterComponent = ({hasMorePages, loading, ads = []}) => {
  return (
    <Box py={3} my={2}>
      {loading ? (
        <Spinner size="sm" />
      ) : !hasMorePages && ads.length > 0 ? (
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
